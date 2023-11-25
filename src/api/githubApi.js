export const getPinnedRepos = async () => {
    const apiUrl = 'https://pinned.berrysauce.me/get/zakschenck';
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Github API failed to fetch')
        const githubData = await response.json();
        return githubData;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}