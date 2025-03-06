import { BouncingGifConstants as C } from "@/utils/constants";

export type PositionState = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  rotation: number;
  rotationDirection: number;
};

export type MoveAction = {
  type: "MOVE";
  scale: number;
};

export function movementReducer(state: PositionState, action: MoveAction): PositionState {
  const { scale } = action;
  const gifWidth = C.WIDTH * scale;
  const gifHeight = C.HEIGHT * scale;

  let newX = state.x + state.dx;
  let newY = state.y + state.dy;
  let newDX = state.dx;
  let newDY = state.dy;
  let newRotationDirection = state.rotationDirection;

  if (newX <= C.MIN_POSITION || newX + gifWidth >= C.PARENT_WIDTH) {
    newDX = -newDX;
    newX = Math.max(C.MIN_POSITION, Math.min(newX, C.PARENT_WIDTH - gifWidth));
    newRotationDirection *= -1;
  }
  if (newY <= C.MIN_POSITION || newY + gifHeight >= C.PARENT_HEIGHT) {
    newDY = -newDY;
    newY = Math.max(C.MIN_POSITION, Math.min(newY, C.PARENT_HEIGHT - gifHeight));
    newRotationDirection *= -1;
  }

  return {
    x: newX,
    y: newY,
    dx: newDX,
    dy: newDY,
    rotation: state.rotation + newRotationDirection * 0.3,
    rotationDirection: newRotationDirection,
  };
}

export function getNextScale(currentScale: number, sizeDirectionRef: { current: number }): number {
  const currentIndex = C.SIZE_STEPS.indexOf(currentScale);
  if (currentIndex === -1) return currentScale;

  let nextIndex = currentIndex + sizeDirectionRef.current;

  if (nextIndex >= C.SIZE_STEPS.length) {
    nextIndex = C.SIZE_STEPS.length - 2;
    sizeDirectionRef.current = -1;
  } else if (nextIndex < 0) {
    nextIndex = 1;
    sizeDirectionRef.current = 1;
  }

  return C.SIZE_STEPS[nextIndex];
}
