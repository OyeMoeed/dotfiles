return {
  "nvim-neo-tree/neo-tree.nvim",
  branch = "v3.x",
  requires = {
    "nvim-lua/plenary.nvim",
    "echasnovski/mini.icons",
    "MunifTanjim/nui.nvim",
  },
  config = function()
    require("neo-tree").setup({
      window = {
        position = "right",
        width = 30, -- Set the width of the Neo-Tree window
      },
      visible = true,
      hide_dotfiles = true,
    })

    vim.cmd([[nnoremap \ :Neotree reveal<cr>]])
  end,
}
