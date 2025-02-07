'use strict';
var assert = require('chai').assert;
var Camera = require('osg/Camera');
var mat4 = require('osg/glMatrix').mat4;
var vec3 = require('osg/glMatrix').vec3;
var Node = require('osg/Node');
var Shape = require('osg/shape');
var Viewport = require('osg/Viewport');
var ShadowedScene = require('osgShadow/ShadowedScene');
var IntersectionVisitor = require('osgUtil/IntersectionVisitor');

module.exports = function() {
    test('ShadowedScene', function() {
        var pShadow = new ShadowedScene();
        assert.isOk(pShadow.children.length === 0, 'number of children must be 0');
        assert.isOk(pShadow.getParents().length === 0, 'number of parents must be 0');
        var n = new Node();
        pShadow.addChild(n, 0, 200);
        assert.isOk(pShadow.children.length === 1, 'number of children must be 1');
    });

    var DummyIntersector = function() {
        this.point = [0.5, 0.5, 0.5];
        this.stackTransforms = [];
    };

    DummyIntersector.prototype = {
        enter: function() {
            return true;
        },
        setCurrentTransformation: function(matrix) {
            mat4.invert(matrix, matrix);
            this.stackTransforms.push(vec3.transformMat4(vec3.create(), this.point, matrix));
        },
        intersect: function() {
            return true;
        }
    };

    test('IntersectionVisitor with 1 camera', function() {
        var camera = new Camera();
        camera.setViewport(new Viewport());
        camera.setViewMatrix(mat4.lookAt(mat4.create(), [0, 0, -10], [0, 0, 0], [0, 1, 0]));
        camera.setProjectionMatrix(
            mat4.perspective(mat4.create(), Math.PI / 180 * 60, 800 / 600, 0.1, 100.0)
        );

        camera.addChild(Shape.createTexturedQuadGeometry(-0.5, -0.5, 0, 1, 0, 0, 0, 1, 0, 1, 1));

        var pShadow = new ShadowedScene();
        var child = new Node();
        pShadow.addChild(child);
        pShadow.addChild(child);
        pShadow.addChild(child);
        var di = new DummyIntersector();
        var iv = new IntersectionVisitor();
        iv.setIntersector(di);
        camera.accept(iv);

        assert.equalVector(
            di.stackTransforms[0],
            [0.1536, -0.1152, -9.8002],
            0.001,
            'check end transform point'
        );
    });
};
