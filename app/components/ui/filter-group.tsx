import { Flex, Select } from '@chakra-ui/react'

interface Props {
  name: string
  onClick: () => void
  group: string[] | number[]
}

const FilterGroup = ({ name, onClick, group }: Props) => {
  return (
    <Flex gap={2}>
      <Select placeholder={name}>
        {group.map(item => (
          <option value={item} onClick={onClick}>
            {item}
          </option>
        ))}
      </Select>
    </Flex>
  )
}

export default FilterGroup
