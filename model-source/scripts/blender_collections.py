"""Stage-local collection membership without Object.users_collection's scene scans."""


def collection_memberships(data):
    """Return pointer -> collections in exactly Blender's users_collection order.

    Rebuild after linking/unlinking objects. Object names are not stable identifiers;
    pointers remain valid for the lifetime of this snapshot. Scene root collections
    are not in data.collections, so append those just as Blender does.
    """
    memberships = {}
    for collection in list(data.collections) + [scene.collection for scene in data.scenes]:
        for obj in collection.objects:
            memberships.setdefault(obj.as_pointer(), []).append(collection)
    return {key: tuple(value) for key, value in memberships.items()}


def object_collections(obj, memberships):
    """Allow newly created objects; never cache a snapshot across membership edits."""
    cached = memberships.get(obj.as_pointer())
    return cached if cached is not None else obj.users_collection
