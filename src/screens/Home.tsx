import { useState } from "react";
import {
    VStack,
    HStack,
    IconButton,
    useTheme,
    Text,
    Heading,
    FlatList,
    Center,
} from "native-base";
import { SignOut, ChatTeardropText } from "phosphor-react-native";
import { Filter } from "../components/Filter";
import { Order, OrderProps } from "../components/Order";
import { Button } from "../components/Button";
import Logo from "../assets/logo_secondary.svg";
import { useNavigation } from "@react-navigation/native";
export function Home() {
    const { colors } = useTheme();
    const [statusSelected, setStatusSelected] = useState<"open" | "closed">(
        "open"
    );
    const [orders, setOrders] = useState<OrderProps[]>([
        {
            id: "123",
            patrimony: "6516816",
            when: "28/07/2022 às 19:40",
            status: "open",
        },
        {
            id: "321",
            patrimony: "6516816",
            when: "28/07/2022 às 19:40",
            status: "open",
        },
        {
            id: "456",
            patrimony: "6516816",
            when: "28/07/2022 às 19:40",
            status: "open",
        },
        {
            id: "654",
            patrimony: "6516816",
            when: "28/07/2022 às 19:40",
            status: "open",
        },
        {
            id: "789",
            patrimony: "6516816",
            when: "28/07/2022 às 19:40",
            status: "open",
        },
        {
            id: "987",
            patrimony: "6516816",
            when: "28/07/2022 às 19:40",
            status: "open",
        },
    ]);
    const navigation = useNavigation();
    function handleNewOrder() {
        navigation.navigate("new");
    }
    function handleOpenDetails(orderId: string) {
        navigation.navigate("details", { orderId });
    }
    return (
        <VStack flex={1} pb={6} bg="gray.700">
            <HStack
                w="full"
                justifyContent="space-between"
                alignItems="center"
                bg="gray.700"
                pb={5}
                pt={12}
                px={6}
            >
                <Logo />
                <IconButton
                    icon={<SignOut size={26} color={colors.gray[300]} />}
                />
            </HStack>
            <VStack flex={1} px={6}>
                <HStack
                    w="full"
                    mt={8}
                    mb={4}
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Heading color="gray.100">Solicitações</Heading>
                    <Text color="gray.200">{orders.length}</Text>
                </HStack>
                <HStack space={3} mb={8}>
                    <Filter
                        type="open"
                        title="Em andamento"
                        onPress={() => setStatusSelected("open")}
                        isActive={statusSelected === "open"}
                    />
                    <Filter
                        type="closed"
                        title="Finalizado"
                        onPress={() => setStatusSelected("closed")}
                        isActive={statusSelected === "closed"}
                    />
                </HStack>
                <FlatList
                    data={orders}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Order
                            data={item}
                            onPress={() => handleOpenDetails(item.id)}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    ListEmptyComponent={() => (
                        <Center>
                            <ChatTeardropText
                                color={colors.gray[300]}
                                size={40}
                            />
                            <Text
                                color="gray.300"
                                fontSize="xl"
                                mt={6}
                                textAlign="center"
                            >
                                Você ainda não possui {"\n"}
                                Solicitações{" "}
                                {statusSelected === "open"
                                    ? "em andamento"
                                    : "finalizadas"}
                            </Text>
                        </Center>
                    )}
                />
                <Button title="Nova solicitação" onPress={handleNewOrder} />
            </VStack>
        </VStack>
    );
}
