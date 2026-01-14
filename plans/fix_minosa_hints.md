# Plan to Fix Minosa.js Hint Display Issues

## Current Issues

1. **Inverted Vertical Position**: Hints are displayed at the top of the matrix when they should be at the bottom.
2. **Left Alignment**: Hints are always aligned to the left of the matrix.
3. **Rotation**: Hints always show the spawn position rotation instead of the required rotation.

## Root Causes

### 1. Vertical Positioning
The vertical position of hints is determined in the `generateHint` method, specifically in the `calculatePieceBounds` function. The current implementation calculates the bounding box of the piece in the solve pattern but does not account for the correct vertical positioning relative to the board's coordinate system.

### 2. Horizontal Alignment
The horizontal alignment is determined by the `position.x` value in the hint object. Currently, it is set to `pieceBounds.minCol`, which always aligns the hint to the leftmost column of the piece's bounding box without considering the board's layout or the intended placement.

### 3. Rotation
The rotation logic in `determineRequiredRotation` attempts to match the extracted piece shape with standard rotations. However, it defaults to `0` (spawn rotation) when no match is found or when the logic fails to correctly identify the required rotation.

## Proposed Fixes

### 1. Vertical Positioning
- **Issue**: The `position.y` is set to `pieceBounds.minRow`, which places the hint at the top of the matrix.
- **Fix**: Adjust the vertical position to account for the board's height and ensure the hint is displayed at the bottom. This can be achieved by inverting the `y` coordinate or adjusting the calculation to align with the board's bottom.

### 2. Horizontal Alignment
- **Issue**: The `position.x` is set to `pieceBounds.minCol`, which always aligns the hint to the left.
- **Fix**: Introduce logic to center the hint or align it based on the piece's position in the solve pattern. This may involve calculating the center of the piece's bounding box or using a predefined alignment strategy.

### 3. Rotation
- **Issue**: The `rotation` is often set to `0` due to incorrect shape matching or fallback logic.
- **Fix**: Improve the `determineRequiredRotation` function to accurately match the extracted piece shape with standard rotations. Ensure that the fallback logic is robust and provides a meaningful default rotation.

## Implementation Steps

1. **Vertical Positioning**:
   - Modify the `generateHint` method to adjust the `position.y` value. This can be done by subtracting the calculated `y` coordinate from the board's height or using a transformation to align the hint at the bottom.

2. **Horizontal Alignment**:
   - Update the logic for setting `position.x` to center the hint or align it based on the piece's position. This may involve calculating the midpoint of the piece's bounding box or using a predefined offset.

3. **Rotation**:
   - Enhance the `determineRequiredRotation` function to ensure accurate shape matching. This may involve refining the `compareShapes` function or adding additional checks to verify the correct rotation.

## Testing
- After implementing the fixes, test the hint display in various scenarios to ensure:
  - Hints are displayed at the bottom of the matrix.
  - Hints are centered or aligned correctly.
  - Hints show the correct rotation for the piece.

## Code Changes

### Vertical Positioning
```javascript
// In the generateHint method, adjust the position.y calculation:
hint.position = { 
    x: pieceBounds.minCol,
    y: this.boardHeight - pieceBounds.maxRow - 1 // Adjust to align at the bottom
};
```

### Horizontal Alignment
```javascript
// In the generateHint method, adjust the position.x calculation:
const centerX = pieceBounds.minCol + Math.floor(pieceBounds.width / 2);
hint.position = { 
    x: centerX, // Center the hint horizontally
    y: this.boardHeight - pieceBounds.maxRow - 1
};
```

### Rotation
```javascript
// Enhance the determineRequiredRotation function to ensure accurate matching:
if (bestScore < 0.5) { // If the best score is too low, use a fallback
    console.log('[MINOSA] Low confidence in rotation, using fallback');
    // Implement a more robust fallback logic here
}
```

## Conclusion
By addressing these issues, the hints will be displayed correctly at the bottom of the matrix, aligned properly, and with the correct rotation. This will improve the user experience and make the hints more useful for gameplay.