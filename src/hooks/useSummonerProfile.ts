import { useStore } from "@/lib/store"
import { useCommand } from "./useTauri";
import { SummonerProfile } from "@/types/rito";
import { useEffect } from "react";
import { toast } from "sonner";
import { useMutation } from "react-query";
import api from "@/lib/axios";
import { User } from "@/types/riftmaker";

const useSummonerProfile = () => {
    const {user, connected, setUser} = useStore();
    const {data: summonerProfile, isLoading} = useCommand<SummonerProfile>({
        command: "summoner_profile",
        enabled: connected,
    });
    const {mutate: updateAccountId} = useMutation({
        mutationKey: "update_account_id",
        mutationFn: async (accountId: number) => {
            console.info("Updating account ID", accountId)
            return api.post<{ user: User }>('/user/update', {
                accountId,
            })
        },
        onSuccess: (response) => {
            if (!response.data.user) return;
            toast.success("Your account ID has been updated! You can now receive invites.")
            setUser(response.data.user)
        },
        onError: () => {
            toast.error("There was an error updating your account ID. Please close and reopen the app.")
        },
    })

    useEffect(() => {
        if(!summonerProfile || !user) return;
        if (`${summonerProfile?.gameName}#${summonerProfile?.tagLine}` !== user?.riotId) {
            toast.error("Your Riot ID does not match your Summoner Profile. Please update your Riot ID on riftmaker.lol")
            return;
        }
        if (summonerProfile?.accountId.toString() !== user?.accountId?.toString()) {
            updateAccountId(summonerProfile.accountId)
        }
    }, [summonerProfile, user])

    return {
        summonerProfile,
        isLoading,
    }
}

export default useSummonerProfile;