'use strict';
var notify = require('osg/notify');
var ShaderGenerator = require('osgShader/ShaderGenerator');
var ShadowCastShaderGenerator = require('osgShadow/ShadowCastShaderGenerator');
var DisplayNormalVisitor = require('osgUtil/DisplayNormalVisitor');
var DisplayGeometryVisitor = require('osgUtil/DisplayGeometryVisitor');

var ShaderGeneratorProxy = function() {
    // object of shader generators
    this._generators = {};
    this.addShaderGenerator('default', new ShaderGenerator());
    this.addShaderGenerator('ShadowCast', new ShadowCastShaderGenerator());
    this.addShaderGenerator(
        'debugNormal',
        new DisplayNormalVisitor.ShaderGeneratorCompilerOffsetNormal()
    );
    this.addShaderGenerator(
        'debugTangent',
        new DisplayNormalVisitor.ShaderGeneratorCompilerOffsetTangent()
    );
    this.addShaderGenerator(
        'debugGeometry',
        new DisplayGeometryVisitor.ShaderGeneratorCompilerColorGeometry()
    );
    this.addShaderGenerator(
        'debugSkinning',
        new DisplayGeometryVisitor.ShaderGeneratorCompilerColorSkinning()
    );

    return this;
};

ShaderGeneratorProxy.prototype = {
    getShaderGenerator: function(name) {
        if (!name) return this._generators.default;

        var shaderGenerator = this._generators[name];

        if (!shaderGenerator) {
            notify.error('ShaderGenerator ' + name + ' does not exist in ShaderGeneratorProxy');
            return this._generators.default;
        }

        return shaderGenerator;
    },

    // user-space facility to provide its own
    addShaderGenerator: function(name, sg) {
        this._generators[name] = sg;
    }
};

module.exports = ShaderGeneratorProxy;
