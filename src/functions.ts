export const filter = ({ mimetype }: { mimetype: string }): string => {
    if (mimetype.startsWith("image")) {
        return "image";
    } else if (mimetype.startsWith("video")) {
        return "video";
    } else if (mimetype.startsWith("audio")) {
        return "audio";
    } else if (mimetype.includes("pdf")) {
        return "documents/pdf";
    } else {
        return "other"
    }
}