local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"

if not (vim.uv or vim.loop).fs_stat(lazypath) then
  -- bootstrap lazy.nvim
  -- stylua: ignore
  vim.fn.system({ "git", "clone", "--filter=blob:none", "https://github.com/folke/lazy.nvim.git", "--branch=stable", lazypath })
end
vim.opt.rtp:prepend(lazypath)

require("lazy").setup({

  spec = {
    -- add LazyVim and import its plugins
    { "LazyVim/LazyVim", import = "lazyvim.plugins" },
    -- import any extras modules here
    { import = "lazyvim.plugins.extras.linting.eslint" },
    { import = "lazyvim.plugins.extras.formatting.prettier" },
    { import = "lazyvim.plugins.extras.lang.typescript" },
    { import = "lazyvim.plugins.extras.lang.json" },
    { import = "lazyvim.plugins.extras.test.core" },

    -- import/override with your plugins
    { import = "plugins" },

    { "echasnovski/mini.animate", version = "*" },

    {
      "kylechui/nvim-surround",
      version = "*", -- Use for stability; omit to use `main` branch for the latest features
      event = "VeryLazy",
      config = function()
        require("nvim-surround").setup({
          -- Configuration here, or leave empty to use defaults
        })
      end,
    },

    { "echasnovski/mini.icons", version = "*" },

    -- add okuuva/auto-save.nvim plugin
    {
      "okuuva/auto-save.nvim",
      cmd = "ASToggle", -- optional for lazy loading on command
      event = { "InsertLeave", "TextChanged" }, -- optional for lazy loading on trigger events
      opts = {
        enabled = true,
        delay = 1000,
        -- your config goes here
        -- or just leave it empty :)
      },
    },
    -- add blamer.nvim plugin
    -- {
    --   "braxtons12/blame_line.nvim",
    --   event = "BufReadPost", -- optional for lazy loading on event
    --   opts = {
    --     enabled = true, -- or any other configurations specific to blamer.nvim
    --     -- your other configurations go here
    --   },
    -- },
  },
  defaults = {
    -- By default, only LazyVim plugins will be lazy-loaded. Your custom plugins will load during startup.
    -- If you know what you're doing, you can set this to `true` to have all your custom plugins lazy-loaded by default.
    lazy = false,
    -- It's recommended to leave version=false for now, since a lot the plugin that support versioning,
    -- have outdated releases, which may break your Neovim install.
    version = false, -- always use the latest git commit
    -- version = "*", -- try installing the latest stable version for plugins that support semver
  },
  checker = { enabled = true }, -- automatically check for plugin updates
  performance = {
    rtp = {
      disabled_plugins = {
        "gzip", -- Compression plugin
        "matchit", -- Syntax matching plugin
        "matchparen", -- Parentheses matching plugin
        "netrwPlugin", -- File explorer
        "tarPlugin", -- Tar file plugin
        "tohtml", -- HTML conversion
        "tutor", -- Built-in tutorial
        "zipPlugin", -- ZIP file plugin
        "manpager", -- Man page plugin (if not needed)
        "vimballPlugin", -- Vimball plugin (if not using Vimballs)
        "2html_plugin", -- 2html plugin (HTML generation)
      },
    },
  },
})
