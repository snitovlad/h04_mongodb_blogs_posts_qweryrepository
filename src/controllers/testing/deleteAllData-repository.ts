import { blogCollection, postCollection } from "../../db/mongo-db";

export const deleteAllDataRepository = {
    async deleteAllData(): Promise<{ success?: boolean }> {

        try {
            await blogCollection.deleteMany({})
            await postCollection.deleteMany({})
            return { success: true }
        } catch (e) {
            throw new Error('Failed to delete all data')
        }
    }
}
