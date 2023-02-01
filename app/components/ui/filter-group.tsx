import { Flex, Select } from '@chakra-ui/react'

interface Props {
  name: string
  onClick: (value: string) => Promise<void>
  group: string[] | number[]
}

const FilterGroup = ({ name, onClick, group }: Props) => {
  return (
    <Flex gap={2}>
      <Select placeholder={name} onChange={e => onClick(e.target.value)} borderColor="GREY4" w="150px">
        {group.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </Select>
    </Flex>
  )
}

export default FilterGroup
