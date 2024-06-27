import { useQuery } from "@tanstack/react-query";
import getUsers from "./api/users";

const HomePage = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["users"],
        queryFn: () => getUsers(),
    });
    if (error) return "Error: " + error;
    console.log(data);
    return (
        <div>
            <h1>Hola mundo</h1>
        </div>
    );
};

export default HomePage;
