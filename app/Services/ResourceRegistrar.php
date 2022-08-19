<?php

namespace App\Services;

use Illuminate\Routing\ResourceRegistrar as BaseResourceRegistrar;
use Illuminate\Routing\RouteCollection;
use Illuminate\Support\Str;

class ResourceRegistrar extends BaseResourceRegistrar
{

    /**
     * The verbs used in the resource URIs.
     *
     * @var array
     */
    protected static $verbs = [
        'create' => 'create',
        'store' => 'store',
        'edit' => 'edit',
        'destroy' => 'destroy',
        'restore' => 'restore',
    ];

    /**
     * The default actions for a resourceful controller.
     *
     * @var string[]
     */
    protected $resourceDefaults = ['index', 'store', 'destroy_selected', 'restore_selected', 'show', 'update', 'destroy', 'restore'];

    /**
     * Route a resource to a controller.
     *
     * @param  string  $name
     * @param  string  $controller
     * @param  array  $options
     * @return \Illuminate\Routing\RouteCollection
     */
    public function register($name, $controller, array $options = [])
    {
        if (isset($options['parameters']) && !isset($this->parameters)) {
            $this->parameters = $options['parameters'];
        }

        // If the resource name contains a slash, we will assume the developer wishes to
        // register these resource routes with a prefix so we will set that up out of
        // the box so they don't have to mess with it. Otherwise, we will continue.
        if (Str::contains($name, '/')) {
            $this->prefixedResource($name, $controller, $options);

            return;
        }

        // We need to extract the base resource from the resource name. Nested resources
        // are supported in the framework, but we need to know what name to use for a
        // place-holder on the route parameters, which should be the base resources.
        $base = $this->getResourceWildcard(last(explode('.', $name)));

        $defaults = $this->resourceDefaults;

        $collection = new RouteCollection;

        foreach ($this->getResourceMethods($defaults, $options) as $m) {
            $route = $this->{'addResource' . Str::studly($m)}(
                $name,
                $base,
                $controller,
                $options
            );

            if (isset($options['bindingFields'])) {
                $this->setResourceBindingFields($route, $options['bindingFields']);
            }

            $collection->add($route);
        }

        return $collection;
    }

    /**
     * Add the index method for a resourceful route.
     *
     * @param  string  $name
     * @param  string  $base
     * @param  string  $controller
     * @param  array  $options
     * @return \Illuminate\Routing\Route
     */
    protected function addResourceIndex($name, $base, $controller, $options)
    {
        $uri = $this->getResourceUri($name);

        $action = $this->getResourceAction($name, $controller, 'index', $options);

        return $this->router->match(['GET', 'POST'], $uri, $action);
    }

    /**
     * Add the store method for a resourceful route.
     *
     * @param  string  $name
     * @param  string  $base
     * @param  string  $controller
     * @param  array  $options
     * @return \Illuminate\Routing\Route
     */
    protected function addResourceStore($name, $base, $controller, $options)
    {
        $uri = $this->getResourceUri($name) . '/' . static::$verbs['store'];

        $action = $this->getResourceAction($name, $controller, 'store', $options);

        return $this->router->match(['POST'], $uri, $action);
    }

    /**
     * Add the update method for a resourceful route.
     *
     * @param  string  $name
     * @param  string  $base
     * @param  string  $controller
     * @param  array  $options
     * @return \Illuminate\Routing\Route
     */
    protected function addResourceUpdate($name, $base, $controller, $options)
    {
        $name = $this->getShallowName($name, $options);

        $uri = $this->getResourceUri($name) . '/{' . $base . '}';

        $action = $this->getResourceAction($name, $controller, 'update', $options);

        return $this->router->match(['POST', 'PUT', 'PATCH'], $uri, $action);
    }

    /**
     * Add the destroy method for a resourceful route.
     *
     * @param  string  $name
     * @param  string  $base
     * @param  string  $controller
     * @param  array  $options
     * @return \Illuminate\Routing\Route
     */
    protected function addResourceDestroy($name, $base, $controller, $options)
    {
        $name = $this->getShallowName($name, $options);

        $uri = $this->getResourceUri($name) . '/{' . $base . '}' . '/' . static::$verbs['destroy'];

        $action = $this->getResourceAction($name, $controller, 'destroy', $options);

        return $this->router->delete($uri, $action);
    }

    /**
     * Add the destroy selected method for a resourceful route.
     *
     * @param  string  $name
     * @param  string  $base
     * @param  string  $controller
     * @param  array  $options
     * @return \Illuminate\Routing\Route
     */
    protected function addResourceDestroySelected($name, $base, $controller, $options)
    {
        $uri = $this->getResourceUri($name) . '/' . static::$verbs['destroy'];

        $action = $this->getResourceAction($name, $controller, 'destroy_selected', $options);

        return $this->router->delete($uri, $action);
    }

    /**
     * Add the restore method for a resourceful route.
     *
     * @param  string  $name
     * @param  string  $base
     * @param  string  $controller
     * @param  array  $options
     * @return \Illuminate\Routing\Route
     */
    protected function addResourceRestore($name, $base, $controller, $options)
    {
        $name = $this->getShallowName($name, $options);

        $uri = $this->getResourceUri($name) . '/{' . $base . '}/' . static::$verbs['restore'];

        $action = $this->getResourceAction($name, $controller, 'restore', $options);

        return $this->router->post($uri, $action);
    }

    /**
     * Add the restore selected method for a resourceful route.
     *
     * @param  string  $name
     * @param  string  $base
     * @param  string  $controller
     * @param  array  $options
     * @return \Illuminate\Routing\Route
     */
    protected function addResourceRestoreSelected($name, $base, $controller, $options)
    {
        $uri = $this->getResourceUri($name) . '/' . static::$verbs['restore'];

        $action = $this->getResourceAction($name, $controller, 'restore_selected', $options);

        return $this->router->post($uri, $action);
    }
}
