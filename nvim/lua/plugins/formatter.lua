return {
  "stevearc/conform.nvim",
  event = { "BufReadPre", "BufNewFile" },
  config = function()
    local conform = require("conform")

    conform.setup({
      formatters_by_ft = {
        javascript = { "prettier", "eslint_d" },
        typescript = { "prettier", "eslint_d" },
        javasciptreact = { "prettier", "eslint_d" },
        typescriptreact = { "prettier", "eslint_d" },
        lua = { "stylua" },
        json = { "prettier" },
      },
      format_on_save = {
        async = true,
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
