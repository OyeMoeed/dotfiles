return {
  -- Cursor path animation
  cursor = {
    -- Enable cursor animation
    enable = true,

    -- Timing for the animation (using linear progression over 250ms)
    timing = function(step)
      return step / 250
    end,
  },

  -- Vertical scroll animation
  scroll = {
    -- Enable scroll animation
    enable = true,

    -- Timing for the animation (using linear progression over 250ms)
    timing = function(step)
      return step / 250
    end,
  },
}
