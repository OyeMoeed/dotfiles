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
    { import = "lazyvim.plugins.extras.lang.typescript" },
    { import = "lazyvim.plugins.extras.lang.json" },
    { import = "lazyvim.plugins.extras.ui.mini-animate" },
    -- import/override with your plugins
    { import = "plugins" },
    -- Merge conflicts
    { "akinsho/git-conflict.nvim", version = "*", config = true },

    -- add okuuva/auto-save.nvim plugin
    -- example lazy.nvim install setup
    {
      "okuuva/auto-save.nvim",
      cmd = "ASToggle", -- optional for lazy loading on command
      event = { "InsertLeave", "TextChanged" }, -- optional for lazy loading on trigger events
      opts = {
        enabled = true,
        delay = 100,
        -- your config goes here
        -- or just leave it empty :)
      },
    },
    -- add blamer.nvim plugin
    {
      "braxtons12/blame_line.nvim",
      event = "BufReadPost", -- optional for lazy loading on event
      opts = {
        enabled = true, -- or any other configurations specific to blamer.nvim
        -- your other configurations go here
      },
    },
    ---focus
    {
      "nvim-focus/focus.nvim",
      version = "*",
      enabled = true,
      commands = true,
      opts = {
        autoresize = { width = 150, minwidth = 30 },
        ui = {
          number = true, -- Display line numbers in the focussed window only
          relativenumber = true, -- Display relative line numbers in the focussed window only
        },
      },
    },
  },
  defaults = {
    -- By default, only LazyVim plugins will be lazy-loaded. Your custom plugins will load during startup.
    -- If you know what you're doing, you can set this to `true` to have all your custom plugins lazy-loaded by default.
    lazy = true,
    -- It's recommended to leave version=false for now, since a lot the plugin that support versioning,
    -- have outdated releases, which may break your Neovim install.
    version = "*", -- always use the latest git commit
    -- version = "*", -- try installing the latest stable version for plugins that support semver
  },
  install = { colorscheme = { "habamax" } },
  checker = { enabled = true }, -- automatically check for plugin updates
  performance = {
    rtp = {
      -- disable some rtp plugins
      disabled_plugins = {
        "gzip",
        "matchit",
        "matchparen",
        "netrwPlugin",
        "tarPlugin",
        "tohtml",
        "tutor",
        "zipPlugin",
      },
    },
  },
})
