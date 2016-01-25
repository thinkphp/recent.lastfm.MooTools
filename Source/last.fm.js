/*
---
description: 

authors:
- Adrian Statescu (http://thinkphp.ro)

license:
- MIT-style license

requires:
 core/1.6.0: '*'
 Handlebars: '1.0.0' 

provides: [Lastfm]
...

*/
var Lastfm = new Class({

             initialize: function( config ) {

                        this.url = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=' + config.username + 

                                   '&api_key=' + config.apikey + 

                                   '&limit=' + config.count + 

                                   '&format=json'

		            this.template = config.template

               		this.container = config.container

                        if( document.id('recent-header') ) document.id('recent-header').set('html','Get the Recent Tracks from <b>' + config.username + '\'</b>s Music Last.fm')

            		this.fetch()
             },

             attachTemplate: function() {

                       var template = Handlebars.compile( this.template )
 
                       this.container.set('html', template( this.tracks ) )
             },

             fetch: function() {

                    var self = this

                         new Request.JSON({url: this.url, onSuccess: function( data ){

                             var out = data.recenttracks.track

                             self.tracks = out.map(function( track ) {

                                  return {
                                         image: track.image[ 2 ]['#text'],

                                         song: track.name,

                                         artist: track.artist['#text'],

                                         album: track.album['#text'],

                                         link: track.url                                           
                                  } 
                             }) 
                                 
                             self.attachTemplate( )
                        }
                        }).get( )
             }         
})