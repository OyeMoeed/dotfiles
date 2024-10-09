return {
  "mfussenegger/nvim-lint",
  event = { "BufReadPre", "BufNewFile" },
  config = function()
    local lint = require("lint")

    lint.linters_by_ft = {
      javascript = { "eslint_d", "commitlint" },
      typescript = { "eslint_d", "commitlint" },
      javascriptreact = { "eslint_d", "commitlint" },
      typescriptreact = { "eslint_d", "commitlint" },
    }

    local lint_augroup = vim.api.nvim_create_augroup("lint", { clear = true })

    vim.api.nvim_create_autocmd({ "BufEnter", "BufWritePost", "InsertLeave" }, {
      group = lint_augroup,
      callback = function()
        lint.try_lint()
      end,
    })

    vim.keymap.set("n", "<leader>cL", function()
      lint.try_lint()
    end, { desc = "Trigger linting for current file" })
  end,
}
