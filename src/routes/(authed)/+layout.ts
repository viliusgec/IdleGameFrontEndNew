export const load = async function ({ data, parent }) {
    await parent();
    return {
        player: data.player,
        playerSkills: data.playSkils,
        token: data.token
    };
};
