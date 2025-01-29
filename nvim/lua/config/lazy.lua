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

    -- lazy git
    {
      "kdheepak/lazygit.nvim",
      cmd = {
        "LazyGit",
        "LazyGitConfig",
        "LazyGitCurrentFile",
        "LazyGitFilter",
        "LazyGitFilterCurrentFile",
      },
      -- optional for floating window border decoration
      dependencies = {
        "nvim-lua/plenary.nvim",
      },
      -- setting the keybinding for LazyGit with 'keys' is recommended in
      -- order to load the plugin when the command is run for the first time
      keys = {
        { "<leader>lg", "<cmd>LazyGit<cr>", desc = "Open lazy git" },
      },
    },
    {
      "folke/snacks.nvim",
      priority = 1000,
      lazy = false,
      ---@type snacks.Config
      opts = {
        -- your configuration comes here
        -- or leave it empty to use the default settings
        -- refer to the configuration section below
        bigfile = { enabled = true },
        dashboard = { enabled = true },
        indent = { enabled = true },
        input = { enabled = true },
        notifier = { enabled = true },
        quickfile = { enabled = true },
        scroll = { enabled = true },
        statuscolumn = { enabled = true },
        words = { enabled = true },
      },
    },
    -- Image
    {
      "vhyrro/luarocks.nvim",
      priority = 1001, -- this plugin needs to run before anything else
      opts = {
        rocks = { "magick" },
      },
    },
    {
      "3rd/image.nvim",
      config = function()
        require("image").setup({
          backend = "kitty",
          integrations = {
            markdown = {
              enabled = true,
              clear_in_insert_mode = false,
              download_remote_images = true,
              only_render_image_at_cursor = false,
              filetypes = { "markdown", "vimwiki" }, -- markdown extensions (ie. quarto) can go here
              resolve_image_path = function(document_path, image_path, fallback)
                return fallback(document_path, image_path)
              end,
            },
            html = {
              enabled = false,
            },
            css = {
              enabled = false,
            },
          },
          max_width = nil,
          max_height = nil,
          max_width_window_percentage = nil,
          max_height_window_percentage = 50,
          window_overlap_clear_enabled = false, -- toggles images when windows are overlapped
          window_overlap_clear_ft_ignore = { "cmp_menu", "cmp_docs", "" },
          editor_only_render_when_focused = false, -- auto show/hide images when the editor gains/looses focus
          tmux_show_only_in_active_window = false, -- auto show/hide images in the correct Tmux window (needs visual-activity off)
          hijack_file_patterns = { "*.png", "*.jpg", "*.jpeg", "*.gif", "*.webp", "*.avif" }, -- render image files as images when opened
        })
      end,
    },

    --Supermaven
    {
      "supermaven-inc/supermaven-nvim",
      event = "InsertEnter",
      cmd = {
        "SupermavenUseFree",
      },
      opts = {
        keymaps = {
          accept_suggestion = nil, -- handled by nvim-cmp / blink.cmp
        },
        ignore_filetypes = { "bigfile", "snacks_input", "snacks_notif" },
      },
    },

    -- add okuuva/auto-save.nvim plugin
    {
      "okuuva/auto-save.nvim",
      cmd = "ASToggle", -- optional for lazy loading on command
      event = { "InsertLeave", "TextChanged" }, -- optional for lazy loading on trigger events
      opts = {
        enabled = true,
        delay = 3000,
        -- your config goes here
        -- or just leave it empty :)
      },
    },

    -- ZenMode
    {
      "folke/zen-mode.nvim",
      opts = {
        -- your configuration comes here
        -- or leave it empty to use the default settings
        -- refer to the configuration section below
      },
    },
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
      -- disable some rtp plugins
      disabled_plugins = {
        "gzip",
        -- "matchit",
        -- "matchparen",
        -- "netrwPlugin",
        "tarPlugin",
        "tohtml",
        "tutor",
        "zipPlugin",
      },
    },
  },
})
