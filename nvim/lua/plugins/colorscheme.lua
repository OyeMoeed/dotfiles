return {
  "shaunsingh/nord.nvim",
  opts = {
    -- Optional: Configure transparency settings
    transparent = true,
    styles = {
      sidebars = "transparent",
      floats = "transparent",
    },
  },
  config = function()
    -- Set Nord-specific global variables
    vim.g.nord_contrast = true
    vim.g.nord_borders = true
    vim.g.nord_disable_background = true
    vim.g.nord_italic = false
    vim.g.nord_uniform_diff_background = false
    vim.g.nord_bold = false

    -- Load the Nord colorscheme
    require("nord").set()
  end,
}
