import { FC } from 'react'

type BadgeProps = {
  count: string
}

const UiBadge: FC<BadgeProps> = ({ count }: BadgeProps) => {
  return (
    <span className="absolute top-[-7px] right-1 inline-flex items-center justify-center px-1.5 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
      {count}
    </span>
  )
}

export default UiBadge
