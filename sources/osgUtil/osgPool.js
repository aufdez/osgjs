/**
 * Authors:
 *  Tuan.kuranes <tuan.kuranes@gmail.com> Jerome Etienne <Jerome.etienne@gmail.com>
 */

'use strict';
var osgPool = {};
osgPool.memoryPools = {};

/*
 *  TODO: Add stats & reports for developper per application  finer calibration (max, min, average)
 *  TODO: Debug Mode: check if not putting object twice, etc.
 *  USAGE: osg.memoryPools.stateGraph = new OsgObjectMemoryPool(osg.StateGraph).grow(50);
 */
osgPool.OsgObjectMemoryPool = function ( ObjectClassName ) {
    return {
        _memPool: [],
        _memPoolAway: [],
        reset: function () {
            this._memPool = [];
            this._memPoolAway = [];
            return this;
        },
        recycle: function () {
            for ( var i = 0, l = this._memPoolAway.length; i < l; i++ ) {
                this._memPool.push( this._memPoolAway[ i ] );
            }
            return this;
        },
        put: function ( obj ) {
            this._memPoolAway.splice( this._memPoolAway.indexOf( obj ), 1 );
            this._memPool.push( obj );
        },
        get: function () {
            if ( this._memPool.length > 0 ) {
                var obj = this._memPool.pop();
                this._memPoolAway.push( obj );
                return obj;
            }
            this.grow();
            return this.get();
        },
        grow: function ( sizeAddParam ) {
            var sizeAdd;
            if ( sizeAddParam === undefined ) {
                sizeAdd = ( this._memPool.length > 0 ) ? this._memPool.length * 2 : 20;
            } else {
                sizeAdd = sizeAddParam;
            }
            var i = this._memPool.length;
            while ( i++ < sizeAdd ) this._memPool.push( new ObjectClassName() );
            return this;
        }
    };
};

/*
 *  TODO: the same for  TypedArrays.
 *  TODO: Add stats reports for developper per application  finer calibration (max, min, average)
 *  TODO: Debug Mode: check if not putting object twice, etc.
 *  USAGE: osg.memoryPools.arrayPool = new OsgArrayMemoryPool();
 *  mymatrix = osg.memoryPools.arrayPool.get(16);
 *  // do use matrix, etc..
 *  osg.memoryPools.arrayPool.put(mymatrix);
 */
osgPool.OsgArrayMemoryPool = function () {
    return {
        _mempoolofPools: [],
        reset: function () {
            this._memPoolofPools = {};
            return this;
        },
        put: function ( obj ) {
            if ( !this._memPoolofPools[ obj.length ] )
                this._memPoolofPools[ obj.length ] = [];
            this._memPoolofPools[ obj.length ].push( obj );
        },
        get: function ( arraySize ) {
            if ( !this._memPoolofPools[ arraySize ] )
                this._memPoolofPools[ arraySize ] = [];
            else if ( this._memPoolofPools.length > 0 )
                return this._memPool.pop();
            this.grow( arraySize );
            return this.get();
        },
        grow: function ( arraySize, sizeAdd ) {
            if ( sizeAdd === undefined ) sizeAdd = ( this._memPool.length > 0 ) ? this._memPool.length * 2 : 20;
            var i = this._memPool.length;
            while ( i++ < sizeAdd ) this._memPool.push( new Array( arraySize ) );
            return this;
        }
    };
};

module.exports = osgPool;
