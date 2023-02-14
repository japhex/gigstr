import { Flex, Skeleton } from '@chakra-ui/react'

export default function SkeletonLoaderThin() {
  return (
    <Flex flex="0 0 calc(400px + 16px)" bg="GREY3" borderRadius={4} gap={4}>
      <Skeleton startColor="GREY3" endColor="GREY4" width="200px" height="150px" />
      <Flex direction="column" gap={2} p={4} w="100%">
        <Skeleton startColor="GREY3" endColor="GREY4" width="100%" height="20px" />
        <Skeleton startColor="GREY3" endColor="GREY4" width="100%" height="10px" />
        <Skeleton startColor="GREY3" endColor="GREY4" width="100%" height="5px" />
        <Skeleton startColor="GREY3" endColor="GREY4" width="100%" height="5px" />
        <Skeleton startColor="GREY3" endColor="GREY4" width="100%" height="5px" />
        <Skeleton startColor="GREY3" endColor="GREY4" width="100%" height="5px" />
      </Flex>
    </Flex>
  )
}
