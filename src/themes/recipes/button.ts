import { defineRecipe } from '@pandacss/dev'

export const buttonRecipe = defineRecipe({
  className: 'button',
  description: 'Minimal black and white button component',
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    px: '6',
    py: '3',
    fontSize: 'md',
    fontWeight: 'medium',
    lineHeight: '1',
    borderRadius: 'md',
    border: '1px solid',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    outline: 'none',
    _disabled: {
      opacity: '0.5',
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
    _focus: {
      boxShadow: '0 0 0 2px {colors.focus.default}',
    },
  },
  variants: {
    variant: {
      solid: {
        bg: '{colors.content.primary}',
        color: '{colors.surface.base}',
        borderColor: '{colors.content.primary}',
        _hover: {
          bg: '{colors.content.secondary}',
          borderColor: '{colors.content.secondary}',
        },
        _active: {
          transform: 'translateY(1px)',
        },
      },
      outline: {
        bg: 'transparent',
        color: '{colors.content.primary}',
        borderColor: '{colors.border.primary}',
        _hover: {
          bg: '{colors.border.secondary}',
          borderColor: '{colors.content.primary}',
        },
        _active: {
          bg: '{colors.border.primary}',
          transform: 'translateY(1px)',
        },
      },
      ghost: {
        bg: 'transparent',
        color: '{colors.content.primary}',
        borderColor: 'transparent',
        _hover: {
          bg: '{colors.border.secondary}',
        },
        _active: {
          bg: '{colors.border.primary}',
          transform: 'translateY(1px)',
        },
      },
      text: {
        bg: 'transparent',
        color: '{colors.content.secondary}',
        borderColor: 'transparent',
        px: '2',
        py: '1',
        _hover: {
          color: '{colors.content.primary}',
        },
        _active: {
          color: '{colors.content.primary}',
        },
      },
    },
    size: {
      sm: {
        px: '4',
        py: '2',
        fontSize: 'sm',
      },
      md: {
        px: '6',
        py: '3',
        fontSize: 'md',
      },
      lg: {
        px: '8',
        py: '4',
        fontSize: 'lg',
      },
    },
    width: {
      auto: {
        width: 'auto',
      },
      full: {
        width: '100%',
      },
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
    width: 'auto',
  },
})
