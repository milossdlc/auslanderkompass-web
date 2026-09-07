import math

from geo import min_distance_to_polyline, project_along_route, _haversine_km


def test_haversine_known_distance():
    # Berlin to Munich is roughly 500-510 km great-circle.
    berlin = (52.5200, 13.4050)
    munich = (48.1351, 11.5820)
    dist = _haversine_km(*berlin, *munich)
    assert 490 < dist < 520


def test_point_on_the_line_has_zero_distance():
    polyline = [(50.0, 8.0), (50.5, 8.5), (51.0, 9.0)]
    dist = min_distance_to_polyline((50.5, 8.5), polyline)
    assert dist < 0.01


def test_point_far_from_line_has_large_distance():
    polyline = [(50.0, 8.0), (50.5, 8.5), (51.0, 9.0)]
    far_point = (55.0, 20.0)
    dist = min_distance_to_polyline(far_point, polyline)
    assert dist > 100


def test_empty_polyline_gives_infinite_distance():
    assert min_distance_to_polyline((50.0, 8.0), []) == math.inf


def test_project_along_route_orders_points_correctly():
    # A simple straight-ish line heading roughly east.
    polyline = [(50.0, 8.0), (50.0, 8.5), (50.0, 9.0), (50.0, 9.5)]
    near_start = project_along_route((50.0, 8.05), polyline)
    near_middle = project_along_route((50.0, 8.75), polyline)
    near_end = project_along_route((50.0, 9.45), polyline)
    assert near_start < near_middle < near_end
