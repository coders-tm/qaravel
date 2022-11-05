<?php

namespace App\Enum;

enum StatusEnum: string
{
    case ACTIVE = 'Active';
    case DEACTIVE = 'Deactive';
    case HOLD = 'Hold';
    case LOST = 'Lost';
    case PENDING = 'Pending';
    case ERROR = 'Error';
    case REPLIED = 'Replied';
    case STAFF_REPLIED = 'Staff Replied';
    case COMPLETED = 'Completed';
    case ONGOING = 'Ongoing';
    case RESOLVED = 'Resolved';
}
