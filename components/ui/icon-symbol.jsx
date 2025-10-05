// Cross-platform icon component using Ionicons

import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code-slash',
  'chevron.right': 'chevron-forward',
};

/**
 * A cross-platform icon component using Ionicons.
 * Provides consistent icons across all platforms.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  ...props
}) {
  const iconName = MAPPING[name] || name;
  return (
    <Ionicons 
      name={iconName} 
      size={size} 
      color={color} 
      style={style} 
      {...props}
    />
  );
}

export default IconSymbol;
