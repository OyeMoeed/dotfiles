return {
	"nvim-neo-tree/neo-tree.nvim",
	branch = "v3.x",
	requires = {
		"nvim-lua/plenary.nvim",
		"nvim-tree/nvim-web-devicons",
		"MunifTanjim/nui.nvim",
	},
	config = function()
		require("neo-tree").setup({
			window = {
				width = 25, -- Set the width of the Neo-Tree window
			},
		})

		vim.cmd([[nnoremap \ :Neotree reveal<cr>]])
	end,
}
