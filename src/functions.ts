type filterProps = {
    mimetype: string,
}

const filter = ({ mimetype }: filterProps): string => {


    if (mimetype.startsWith("image")) {
        return "image";
    } else if (mimetype.startsWith("video")) {
        return "video";
    } else if (mimetype.startsWith("audio")) {
        return "audio";
    } else if (mimetype.startsWith("application")) {
        return "other";
    } else {
        return "other"
    }
}

export {filter};