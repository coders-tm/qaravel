<?php

namespace App\Models\Core;

use App\Traits\Core;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class File extends Model
{
    use Core;

    protected $file;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'disk',
        'url',
        'path',
        'original_file_name',
        'hash',
        'mime_type',
        'extension',
        'size',
        'ref',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'name',
        'is_image',
        'is_pdf',
        'icon',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'is_embed' => 'boolean',
    ];

    public function __construct(array $attributes = array())
    {
        parent::__construct($attributes);
        $this->attributes['disk'] = isset($attributes['disk']) ? $attributes['disk'] :  config('filesystems.default');
    }

    public function setHttpFile($file)
    {
        $this->file = $file;
        $this->original_file_name = $file->getClientOriginalName();
        $this->hash = md5_file($file->getRealPath());
        $this->mime_type = $file->getMimeType();
        $this->extension = $file->extension();
        $this->size = $file->getSize();
    }

    public function save($options = array())
    {
        if ($this->file) {
            $this->path = $this->file->storeAs('files', $this->hash . '.' . $this->extension, $this->disk);
            $this->url = Storage::disk($this->disk)->url($this->path);
        }
        return parent::save($options);
    }

    public function modify($options = array())
    {
        if ($this->file) {
            $this->path = $this->file->storeAs('public', $this->path);
        }
        return parent::update($options);
    }

    public function delete()
    {
        $count = self::wherePath($this->path)->count();
        if ($count == 1) {
            Storage::delete($this->path);
        }
        return parent::delete();
    }

    public function fileable()
    {
        return $this->morphTo();
    }

    public function getUrlAttribute($value)
    {
        return route('files.download', [
            'hash' => $this->hash,
            'path' => $this->original_file_name,
        ]);
    }

    public function getNameAttribute()
    {
        return $this->original_file_name;
    }

    public function getIsImageAttribute()
    {
        return Str::contains($this->mime_type, 'image') && !$this->is_embed;
    }

    public function getIsPdfAttribute()
    {
        return Str::contains($this->mime_type, 'pdf');
    }

    public function getIconAttribute()
    {
        return $this->fileType($this->original_file_name);
    }

    protected function fileType($file_name)
    {
        $extension = explode('.', $file_name);
        $extension = $extension[count($extension) - 1];
        switch ($extension) {
            case 'pdf':
                $type = 'pdf';
                break;
            case 'docx':
            case 'doc':
                $type = 'word';
                break;
            case 'xls':
            case 'xlsx':
                $type = 'excel';
                break;
            case 'mp3':
            case 'ogg':
            case 'wav':
                $type = 'audio';
                break;
            case 'mp4':
            case 'mov':
                $type = 'video';
                break;
            case 'zip':
            case '7z':
            case 'rar':
                $type = 'archive';
                break;
            case 'jpg':
            case 'jpeg':
            case 'png':
                $type = 'image';
                break;
            default:
                $type = 'alt';
        }
        return $type;
    }

    static public function findByHash(string $hash)
    {
        return static::where('hash', $hash)->firstOrFail();
    }
}
