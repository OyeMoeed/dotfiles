return {
  "stevearc/conform.nvim",
  event = { "BufReadPre", "BufNewFile" },
  config = function()
    local conform = require("conform")

    conform.setup({
      formatters_by_ft = {
        javascript = { "prettier" },
        typescript = { "prettier" },
        javasciptreact = { "prettier" },
        typescriptreact = { "prettier" },
        lua = { "stylua" },
        json = { "prettier" },
      },
      format_on_save = {
        async = false,
        timeout_ms = 500,
      },
    })

    vim.keymap.set({ "n", "v" }, "<leader>cp", function()
      conform.format({
        async = false,
        timeout_ms = 500,
      })
    end, { desc = "Format Using Prettier" })
  end,
}
