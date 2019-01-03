import videoService from '../../../application/videoService';

/**
 * Export the graphQl user resolver
 */
export default {
    Query: {
        convertVideo: (parent, args, context) => videoService.convertVideo(args)
    }
};

