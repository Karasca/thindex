
import { Component, OnInit } from '@angular/core';
import thindex from '../../data/thindex.json';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

import _ from 'lodash';

@Component({
  selector: 'th-index',
  templateUrl: './th-index.component.html',
  animations: [
    // triggers
    // trigger()
  ]
})


export class ThIndexComponent implements OnInit {
  // The code in this class drives the component's behavior.
  albumExpanded:string="";
  
  songcount = thindex.length;

  albums = _.chain(thindex)
  .groupBy((item) => `${item.albumartist}${' / '}${item.album}`)
  .map((val, key) => ({ 
    key, val, 
    length: this.songcount, 
    year: _.take(val)[0].date,
    startIndex: _.take(val)[0].index
  }))
  .value();

  filteredAlbums = this.albums;

  filterResults(searchText:string){
    console.clear
    if(!searchText){
      this.filteredAlbums = this.albums;
    }else{
      this.filteredAlbums = this.albums.filter(
        album => album?.key.toLowerCase().includes(searchText) || 
        album?.val.some(val => val.title.toLowerCase().includes(searchText))
      );
    }

    this.countSongs();
  }

  onAlbumClick(album:string){
    this.albumExpanded = album;
    alert(album)
  }

  countSongs(){
    this.songcount = 0
    _.forEach(this.filteredAlbums, (album) => {
      this.songcount += album.val.length
    })
  }

  getAlbumImage(startIndex:string){
    return `/assets/img/albumart/${startIndex}.jpg`
  }

  ngOnInit() {
    console.log(this.filteredAlbums);
  }
}
