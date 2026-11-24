<?php

namespace App\Backend\Utilities;

class Validator
{
    public static array $errors;

    public static function validateUserName(string $str)
    {
        // trim spaces
        $name = trim($str);
        // replace 
        $clean_name = str_replace('_', '', $name);
        if (ctype_alnum($clean_name)) {
            return true;
        } 
        else {
            $chr_array = str_split($clean_name, 1);
            foreach ($chr_array as $index => $char) {
                if ($char !== '_' && !ctype_alnum($char)) {
                    array_push(self::$errors, "Character " . $char . " is not allowed");
                }
            }
            return false;
        }
        // return ( ctype_alnum($clean_name)) ? true : false;

    }

    public static function validateEmail( string $str ) {
        if( filter_var($str, FILTER_VALIDATE_EMAIL ) ) {
            return true;
        }
        else {
            array_push( self::$errors, "Email address is not valid");
            return false;
        }
    }

    public static function validatePassword( string $str ) {
        if( strlen($str) >= 8 ) {
            return true;
        }
        else {
            array_push( self::$errors, "Minimum length is 8 characters");
        }
    }
}
