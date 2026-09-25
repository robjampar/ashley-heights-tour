"""Dimension strings, level markers and opening tags drawn in model units."""
import math
from matplotlib.patches import Circle
from .sheet import INK, MUTED

TICK = .12


def _mm(v):
    return f'{int(round(v * 1000)):,}'.replace(',', ' ')


def dim_h(ax, x0, x1, y, text=None, offset=0.0, size=5.2, color=INK, ext=True, above=True):
    """Horizontal dimension between x0 and x1 on line y; extension lines from y-offset."""
    x0, x1 = sorted((x0, x1))
    if ext and offset:
        for x in (x0, x1):
            ax.plot([x, x], [y - offset if above else y + offset, y + (TICK if above else -TICK)], color=color, lw=.35)
    ax.plot([x0 - TICK, x1 + TICK], [y, y], color=color, lw=.4)
    for x in (x0, x1):
        ax.plot([x - TICK * .6, x + TICK * .6], [y - TICK * .6, y + TICK * .6], color=color, lw=.5)
    ax.text((x0 + x1) / 2, y + (TICK * .8 if above else -TICK * .8), text or _mm(x1 - x0), ha='center', va='bottom' if above else 'top', fontsize=size, color=color)


def dim_v(ax, y0, y1, x, text=None, offset=0.0, size=5.2, color=INK, ext=True, right=True):
    y0, y1 = sorted((y0, y1))
    if ext and offset:
        for y in (y0, y1):
            ax.plot([x - offset if right else x + offset, x + (TICK if right else -TICK)], [y, y], color=color, lw=.35)
    ax.plot([x, x], [y0 - TICK, y1 + TICK], color=color, lw=.4)
    for y in (y0, y1):
        ax.plot([x - TICK * .6, x + TICK * .6], [y - TICK * .6, y + TICK * .6], color=color, lw=.5)
    ax.text(x + (TICK * .8 if right else -TICK * .8), (y0 + y1) / 2, text or _mm(y1 - y0), ha='left' if right else 'right', va='center', fontsize=size, color=color, rotation=90)


def level_marker(ax, u, z, label, size=5.4, color=INK, left=True):
    """▽ +5.35 EAVES at horizontal position u on an elevation/section."""
    d = .28
    tri = [(u, z), (u - d * .6, z + d), (u + d * .6, z + d)] if left else [(u, z), (u - d * .6, z + d), (u + d * .6, z + d)]
    ax.plot([p[0] for p in tri] + [tri[0][0]], [p[1] for p in tri] + [tri[0][1]], color=color, lw=.5)
    ax.plot([u - 1.2, u + 1.2], [z, z], color=color, lw=.35)
    sign = '+' if z >= 0 else '−'
    ax.text(u + (0.05 if left else -0.05), z + d + .05, f'{sign}{abs(z):.2f}  {label}', ha='left' if left else 'right', va='bottom', fontsize=size, color=color)


def tag(ax, xy, label, r=.28, size=4.8, color=INK, zorder=20):
    ax.add_patch(Circle(xy, r, facecolor='white', edgecolor=color, lw=.45, zorder=zorder))
    ax.text(xy[0], xy[1], label, ha='center', va='center', fontsize=size, color=color, zorder=zorder + 1)


def section_marker(ax, a, b, letter, size=6.5, color=INK, flag=.6):
    """Section line a→b with lettered flags at both ends pointing to the view direction (left of a→b)."""
    (x0, y0), (x1, y1) = a, b
    ax.plot([x0, x1], [y0, y1], color=color, lw=.35, linestyle=(0, (8, 2, 1.5, 2)), zorder=30)   # chain line
    dx, dy = x1 - x0, y1 - y0; L = math.hypot(dx, dy); ux, uy = dx / L, dy / L; nx, ny = -uy, ux
    for (px, py) in ((x0, y0), (x1, y1)):
        ax.plot([px, px + nx * flag], [py, py + ny * flag], color=color, lw=1.2, zorder=30)
        ax.add_patch(Circle((px + nx * (flag + .45), py + ny * (flag + .45)), .42, facecolor='white', edgecolor=color, lw=.7, zorder=31))
        ax.text(px + nx * (flag + .45), py + ny * (flag + .45), letter, ha='center', va='center', fontsize=size, weight='bold', color=color, zorder=32)


def overall_dims(ax, poly, gap=1.2, size=5.2):
    """Extent dimensions along the bottom and right of a footprint polygon."""
    minx, miny, maxx, maxy = poly.bounds
    dim_h(ax, minx, maxx, miny - gap, offset=gap - .3, above=False, size=size)
    dim_v(ax, miny, maxy, maxx + gap, offset=gap - .3, size=size)
