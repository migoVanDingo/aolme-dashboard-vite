export const PayloadCloneRepoProject = ({id, cloneUrl, userId, projectId}: any) => {
    const payload = {
        github_id: id,
        clone_url: cloneUrl,
        user_id: userId,
        project_id: projectId
    }

    return payload
}