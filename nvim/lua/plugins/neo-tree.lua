return {
  "nvim-neo-tree/neo-tree.nvim",
  branch = "v3.x",
  requires = {
    "nvim-lua/plenary.nvim",
    "echasnovski/mini.icons",
    "3rd/image.nvim",
    "MunifTanjim/nui.nvim",
  },
  config = function()
    require("neo-tree").setup({
      window = {
        position = "right",
        width = 25, -- Set the width of the Neo-Tree window
      },
      visible = true,
      hide_dotfiles = false,
    })

    vim.cmd([[nnoremap \ :Neotree reveal<cr>]])
  end,
}
