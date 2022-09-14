<?php

namespace App\Traits;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use PDO;

trait Helpers
{
    // jsonable column to migration table
    protected function jsonable(): string
    {
        $driverName = DB::connection()->getPdo()->getAttribute(PDO::ATTR_DRIVER_NAME);
        $dbVersion = DB::connection()->getPdo()->getAttribute(PDO::ATTR_SERVER_VERSION);
        $isOldVersion = version_compare($dbVersion, '5.7.8', 'lt');

        return $driverName === 'mysql' && $isOldVersion ? 'text' : 'json';
    }

    protected function getFilters($conditions = array())
    {
        $filters = [];
        foreach ($conditions as $condition) {
            $type = $condition['type'];
            if (Str::contains($type, ':')) {
                $fields = explode(':', $type);
                $filters[$fields[0]][] = $this->getRelation($condition, $fields[1]);
            } else {
                $filters[$type] = $this->getRelation($condition);
            }
        }
        return $filters;
    }

    public function getRelation($condition = array(), $field = false)
    {
        $relation = false;
        $type = $field ? $field : $condition['type'];
        $value = $condition['value'];
        switch ($condition['relation']) {
            case 'EQUALS':
                $relation = [$type, '=', $value];
                break;
            case 'NOT_EQUALS':
                $relation = [$type, '<>', $value];
                break;
            case 'GREATER_THAN':
                $relation = [$type, '>', $value];
                break;
            case 'LESS_THAN':
                $relation = [$type, '<', $value];
                break;
            case 'STARTS_WITH':
                $relation = [$type, 'like', "{$value}%"];
                break;
            case 'ENDS_WITH':
                $relation = [$type, 'like', "%{$value}"];
                break;
            case 'CONTAINS':
                $relation = [$type, 'like', "%{$value}%"];
                break;
            case 'NOT_CONTAINS':
                $relation = [$type, 'not like', "%{$value}%"];
                break;
            case 'IS_NULL':
                $relation = [$type, 'is', 'null'];
                break;
            case 'IS_NOT_NULL':
                $relation = [$type, 'is not', 'null'];
                break;
        }
        return $relation;
    }

    protected function csvToArray($filename = '', $no_header = false, $delimiter = ',')
    {
        if (!file_exists($filename) || !is_readable($filename)) {
            return false;
        }

        try {
            $header = null;
            $data = [];
            if (($handle = fopen($filename, 'r')) !== false) {
                while (($row = fgetcsv($handle, 0, $delimiter)) !== false) {
                    if ($no_header) {
                        $rowData = [];
                        $empty = 0;
                        foreach ($row as $i => $item) {
                            $key = $i + 1;
                            $rowData["field{$key}"] = $item;
                            if (empty($rowData["field{$key}"])) {
                                $empty++;
                            }
                        }
                        if ($empty != count($rowData)) {
                            $data[] = $rowData;
                        }
                    } else {
                        if (!$header) {
                            $header = $row;
                        } else {
                            $rowData = [];
                            $empty = 0;
                            foreach ($header as $i => $head) {
                                $rowData[Str::slug($head)] = isset($row[$i]) ? $row[$i] : null;
                                if (empty($rowData[Str::slug($head)])) {
                                    $empty++;
                                }
                            }
                            if ($empty != count($rowData)) {
                                $data[] = $rowData;
                            }
                        }
                    }
                }
                fclose($handle);
            }

            return $data;
        } catch (\Exception $ex) {
            return $ex;
        }
    }

    protected function distance($lat1, $lon1, $lat2, $lon2, $unit = 'mi')
    {
        $theta = $lon1 - $lon2;
        $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +  cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
        $dist = acos($dist);
        $dist = rad2deg($dist);
        $miles = $dist * 60 * 1.1515;
        $unit = Str::lower($unit);

        if ($unit == "km") {
            return round(($miles * 1.609344), 2);
        } else {
            return round($miles, 2);
        }
    }
}
