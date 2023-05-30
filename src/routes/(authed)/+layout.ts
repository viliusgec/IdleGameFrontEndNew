export const load = async function ({ data }) {
    return {
        player: data.player,
        playerSkills: data.playSkils,
        token: data.token
    };
};
