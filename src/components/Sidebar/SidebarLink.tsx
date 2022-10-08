import { Icon, Link as ChrakraLink, LinkProps, Text } from '@chakra-ui/react'
import { ElementType } from 'react'
import { ActiveLink } from '../ActiveLink'

interface SidebarLinkProps extends LinkProps {
  icon: ElementType
  children: string
  href: string
}

export const SidebarLink = ({
  icon,
  children,
  href,
  ...rest
}: SidebarLinkProps) => {
  return (
    <ActiveLink href={href} passHref>
      <ChrakraLink display="flex" alignItems="center" {...rest}>
        {' '}
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </ChrakraLink>
    </ActiveLink>
  )
}
