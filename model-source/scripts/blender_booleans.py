"""Apply exact Boolean cuts without reevaluating the whole furnished scene.

Only temporary copies are linked to the work scene. The source mesh is replaced
once its cuts succeed; original transforms, collection links and modifiers stay
on the source object. Targets with existing modifiers, constraints or animation use their original
scene because their dependency graph may include objects outside this workspace.
"""
import bpy


class BooleanWorkspace:
    def __init__(self, cutters):
        self.cutters = list(dict.fromkeys(cutters))
        self.scene = None
        self.previous_scene = None

    def __enter__(self):
        self.previous_scene = bpy.context.window.scene
        self.scene = bpy.data.scenes.new('Temporary exact Boolean workspace')
        try:
            for cutter in self.cutters:
                self.scene.collection.objects.link(cutter)
            bpy.context.window.scene = self.scene
        except BaseException:
            self.__exit__(None, None, None)
            raise
        return self

    @staticmethod
    def _cut(ob, cutters, label):
        for cutter in cutters:
            bpy.context.view_layer.objects.active = ob
            modifier = ob.modifiers.new(label, 'BOOLEAN')
            modifier.operation = 'DIFFERENCE'
            modifier.solver = 'EXACT'
            modifier.object = cutter
            bpy.ops.object.modifier_apply(modifier=modifier.name)

    def difference(self, source, cutters, label='Exact Boolean difference'):
        cutters = list(cutters)
        if not cutters:
            return
        if source.modifiers or source.constraints or source.animation_data:
            bpy.context.window.scene = self.previous_scene
            try:
                if source.data.users > 1:
                    source.data = source.data.copy()
                self._cut(source, cutters, label)
            finally:
                bpy.context.window.scene = self.scene
            return
        world = source.matrix_world.copy()
        working = source.copy()
        working.data = source.data.copy()
        working.parent = None
        working.matrix_world = world
        self.scene.collection.objects.link(working)
        try:
            self._cut(working, cutters, label)
            old = source.data
            source.data = working.data
            if old.users == 0:
                bpy.data.meshes.remove(old)
        finally:
            data = working.data
            bpy.data.objects.remove(working, do_unlink=True)
            if data.users == 0:
                bpy.data.meshes.remove(data)

    def __exit__(self, *_):
        if self.previous_scene is not None:
            bpy.context.window.scene = self.previous_scene
        if self.scene is not None:
            bpy.data.scenes.remove(self.scene)
            self.scene = None
