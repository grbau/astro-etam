import { Stack } from "./utils";

export async function getSingleEntry(
  contentType: string, 
  options?: { uid?: string }
) {
    if (options?.uid) {
        // Utiliser entry() pour récupérer une entrée spécifique par UID
        const result = await Stack.ContentType(contentType)
            .Entry(options.uid)
            .toJSON()
            .fetch();
        return result || null;
    }
    
    // Sans UID, récupérer la première entrée
    const result = await Stack.ContentType(contentType)
        .Query()
        .toJSON()
        .find();
    
    return result?.[0]?.[0] || null;
}