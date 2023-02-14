import { Flex, Skeleton } from '@chakra-ui/react'

export default function SkeletonLoader() {
  return (
    <Flex bg="GREY3" borderRadius={4} gap={4} w="100%" direction="column">
      <Skeleton startColor="GREY3" endColor="GREY4" width="100%" height="150px" />
      <Flex direction="column" gap={2} p={4}>
        <Skeleton startColor="GREY3" endColor="GREY4" width="100%" height="20px" />
        <Skeleton startColor="GREY3" endColor="GREY4" width="100%" height="10px" />
        <Skeleton startColor="GREY3" endColor="GREY4" width="100%" height="5px" />
        <Skeleton startColor="GREY3" endColor="GREY4" width="100%" height="5px" />
        <Skeleton startColor="GREY3" endColor="GREY4" width="100%" height="30px" borderRadius="10px" />
      </Flex>
    </Flex>
  )
}
