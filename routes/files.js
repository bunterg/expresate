module.exports = [
    {
        method: 'GET',
        path: '/js/{file}',
        handler: {
		    directory: { 
		    	path: 'files/js',
				listing: true
		    }
		}
    },
    {
        method: 'GET',
        path: '/vendor/{file}',
        handler: {
		    directory: { 
		    	path: 'files/vendor',
				listing: true
		    }
		}
    },
    {
        method: 'GET',
        path: '/img/{file}',
        handler: {
		    directory: { 
		    	path: 'files/img',
				listing: true
		    }
		}
    },
    {
        method: 'GET',
        path: '/css/{file}',
        handler: {
		    directory: { 
		    	path: 'files/css',
				listing: true
		    }
		}
    }
    ];