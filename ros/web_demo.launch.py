"""ros2 launch ros/web_demo.launch.py : turtlesim + rosbridge (port 9090)."""
import os

from launch import LaunchDescription
from launch.actions import IncludeLaunchDescription
from launch.launch_description_sources import AnyLaunchDescriptionSource
from launch_ros.actions import Node
from ament_index_python.packages import get_package_share_directory


def generate_launch_description():
    rosbridge = os.path.join(
        get_package_share_directory("rosbridge_server"), "launch", "rosbridge_websocket_launch.xml"
    )
    return LaunchDescription([
        Node(package="turtlesim", executable="turtlesim_node"),
        IncludeLaunchDescription(AnyLaunchDescriptionSource(rosbridge)),
    ])
