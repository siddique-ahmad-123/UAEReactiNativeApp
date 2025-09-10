import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface PentagonProps {
  color?: string;        // Fill and stroke color of the pentagon
  size?: number;         // Width and height of the SVG container
  rotateAngle?: number;  // Rotation angle in degrees
  cornerRadius?: number; // Corner radius as a fraction of size (0 to 1)
  top?: number;          // Optional top position
  left?: number;         // Optional left position
  bottom?: number;       // Optional bottom position
  right?: number;        // Optional right position
}

const Pentagon = ({ color = '#743E9396', size = 100, rotateAngle = 0, cornerRadius = 1, top, left, bottom, right }: PentagonProps) => {
  // --- How the rounded corners work ---
  // We draw a pentagon path and give it a very thick stroke with rounded joints.   
  // When the stroke color matches the fill color, it creates the illusion of
  // a solid shape with perfectly rounded corners.

  // The strokeWidth is now controlled by the cornerRadius prop.
  // We clamp the value between 0 and 1 to ensure it's valid.
  const clampedRadius = Math.max(0, Math.min(1, cornerRadius));
  const strokeWidth = (size / 4) * clampedRadius;
  
  const center = size / 2;
  // Adjust the radius to account for the stroke.
  const radius = (size - strokeWidth) / 2;

  // Calculate the 5 points (vertices) of the pentagon.
  const points = Array.from({ length: 5 }).map((_, i) => {
    const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2; // Start from top
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    return `${x},${y}`;
  });

  const pathData = `M ${points.join(' L ')} Z`;

  // The rotation is applied to the wrapping View component.
  // Note the React Native-specific transform syntax.
  return (
    <View style={{ 
      transform: [{ rotate: `${rotateAngle}deg` }],
      position: "absolute",
      top,
      left,
      bottom,
      right
    }}>
      <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
        <Path
          d={pathData}
          fill={color}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinejoin="round" // This rounds the corners.
        />
      </Svg>
    </View>
  );
};

export default Pentagon;   

 