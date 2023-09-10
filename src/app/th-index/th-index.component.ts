
import { Component, OnInit } from '@angular/core';
import thindex from '../../data/thindex.json';
import { SongRecord, SongRecordMap } from '../../types.js';
import _ from 'lodash';
@Component({
  selector: 'th-index',
  templateUrl: './th-index.component.html'
})
export class ThIndexComponent implements OnInit {
  // The code in this class drives the component's behavior.
  albumExpanded:string="";
  
  songcount = thindex.length;

  albums = _.chain(thindex)
  .groupBy((item) => `${item.albumartist}${' / '}${item.album}`)
  .map((val, key) => ({ key, val, length: this.songcount, year: _.take(val)[0].date }))
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
  
      // _.forEach(this.filteredAlbums, (album) => {
      //   // album.val = _.remove(album.val, (song) => {
      //   //   song.title == searchText;
      //   // })
      //   console.log(album.val);
      // });
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

  ngOnInit() {
    console.log(this.filteredAlbums);
  }
}
