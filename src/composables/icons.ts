import IconEdit from '~icons/aes-filled-general/edit';
import IconSettingsFilled from '~icons/aes-filled-general/settings';
import IconGridFilled from '~icons/aes-filled-grid-layouts/grid-circle';
import IconAngleDown from '~icons/aes-light-arrows/angle-down';
import IconAngleLeft from '~icons/aes-light-arrows/angle-left';
import AeslAngleLeftSmall from '~icons/aes-light-arrows/angle-left-small';
import IconAngleRight from '~icons/aes-light-arrows/angle-right';
import AeslAngleRightSmall from '~icons/aes-light-arrows/angle-right-small';
import IconAngleUp from '~icons/aes-light-arrows/angle-up';
import IconRotate from '~icons/aes-light-arrows/rotate';
import IconBuildings from '~icons/aes-light-buildings/building';
import IconIdBadge from '~icons/aes-light-business-finance/id-badge';
import IconCalendar from '~icons/aes-light-date-time/calendar';
import IconCalendarEdit from '~icons/aes-light-date-time/calendar-edit';
import IconClipboardListCheck from '~icons/aes-light-documents/clipboard-list-check';
import IconDocument from '~icons/aes-light-documents/document';
import IconDocumentListCheck from '~icons/aes-light-documents/document-list-check';
import IconPapersText from '~icons/aes-light-documents/papers-text';
import IconCloudUpload from '~icons/aes-light-files/cloud-upload';
import IconFileCode from '~icons/aes-light-files/file-code';
import IconsFileCopy from '~icons/aes-light-files/file-copy';
import IconFileEdit from '~icons/aes-light-files/file-edit';
import IconFileExport from '~icons/aes-light-files/file-export';
import IconFileText from '~icons/aes-light-files/file-text';
import IconFileTextCheck from '~icons/aes-light-files/file-text-check';
import IconFileTextEdit from '~icons/aes-light-files/file-text-edit';
import IconFileTextLock from '~icons/aes-light-files/file-text-lock';
import IconFileTextPlus from '~icons/aes-light-files/file-text-plus';
import IconFileTextStar from '~icons/aes-light-files/file-text-star';
import IconFileUpload from '~icons/aes-light-files/file-upload';
import IconFileUser from '~icons/aes-light-files/file-user';
import IconCheckCircle from '~icons/aes-light-general/check-circle';
import IconEditOutline from '~icons/aes-light-general/edit';
import IconLogout from '~icons/aes-light-general/log-out';
import {
  default as AeslPlus,
  default as IconPlus,
} from '~icons/aes-light-general/plus';
import AeslSearch from '~icons/aes-light-general/search';
import {
  default as IconSettings,
  default as IconSettingsLight,
} from '~icons/aes-light-general/settings';
import IconTimes from '~icons/aes-light-general/times';
import IconTrash from '~icons/aes-light-general/trash';
import IconCoinCardTransfer from '~icons/aes-light-money-payment/coin-card-transfer';
import IconCreditCard from '~icons/aes-light-money-payment/credit-card';
import IconMoneyBills from '~icons/aes-light-money-payment/money-bills';
import IconEye from '~icons/aes-light-security/eye';
import IconEyeClosed from '~icons/aes-light-security/eye-closed';
import IconKey from '~icons/aes-light-security/key';
import IconCopyrightCircle from '~icons/aes-light-sign-controls/copy2right-circle';
import IconDiamondExclamation from '~icons/aes-light-sign-controls/diamond-exclamation';
import IconExclamationCircle from '~icons/aes-light-sign-controls/exclamation-circle';
import IconInfoCircle from '~icons/aes-light-sign-controls/info-circle';
import IconTriangleExclamation from '~icons/aes-light-sign-controls/triangle-exclamation';
import IconUserCircle from '~icons/aes-regular-users-people/user-circle';
import IconUsersGroup from '~icons/aes-regular-users-people/users-group';
// import IconPlusCircle from '~icons/aes-project-storage/plus-circle'

import IconMoreHorizontal from '~icons/aes-light-menu/more-horizontal';
const iconsMap = {
  'aesl-angle-left-small': AeslAngleLeftSmall,
  'aesl-angle-right-small': AeslAngleRightSmall,
  'aesl-plus': AeslPlus,
  'aesl-search': AeslSearch,
  'mdi-account-circle': IconUserCircle,
  'mdi-account-group-outline': IconUsersGroup,
  'mdi-alert-circle-outline': IconExclamationCircle,
  'mdi-alert-outline': IconTriangleExclamation,
  'mdi-badge-account-outline': IconIdBadge,
  'mdi-calendar-expand-horizontal-outline': IconCalendarEdit,
  'mdi-calendar-month-outline': IconCalendar,
  'mdi-card-bulleted': IconCreditCard,
  'mdi-card-multiple-outline': IconMoneyBills,
  'mdi-cash-refund': IconCoinCardTransfer,
  'mdi-check-circle-outline': IconCheckCircle,
  'mdi-chevron-down': IconAngleDown,
  'mdi-chevron-left': IconAngleLeft,
  'mdi-chevron-right': IconAngleRight,
  'mdi-chevron-up': IconAngleUp,
  'mdi-clipboard-file-outline': IconFileEdit,
  'mdi-close': IconTimes,
  'mdi-cloud-upload-outline': IconCloudUpload,
  'mdi-cog': IconSettingsFilled,
  'mdi-cog-outline': IconSettingsLight,
  'mdi-content-copy': IconsFileCopy,
  'mdi-copyright': IconCopyrightCircle,
  'mdi-eye-outline': IconEye,
  'mdi-eye-off-outline': IconEyeClosed,
  'mdi-file-account-outline': IconFileUser,
  'mdi-file-certificate-outline': IconFileTextStar,
  'mdi-file-code-outline': IconFileCode,
  'mdi-file-document-edit-outline': IconFileTextEdit,
  'mdi-file-document-multiple-outline': IconPapersText,
  'mdi-file-document-outline': IconDocument,
  'mdi-file-document-plus-outline': IconFileTextPlus,
  'mdi-file-chart-check-outline': IconFileTextCheck,
  'mdi-file-chart-outline': IconFileText,
  'mdi-file-key-outline': IconFileTextLock,
  'mdi-file-link-outline': IconFileExport,
  'mdi-file-upload-outline': IconFileUpload,
  'mdi-form-select': IconDocumentListCheck,
  'mdi-information-slab-circle-outline': IconInfoCircle,
  'mdi-information-variant': IconDiamondExclamation,
  'mdi-key-variant': IconKey,
  'mdi-list-box': IconClipboardListCheck,
  'mdi-logout': IconLogout,
  'mdi-pencil': IconEdit,
  'mdi-pencil-outline': IconEditOutline,
  'mdi-plus': IconPlus,
  'mdi-refresh': IconRotate,
  'mdi-trash-can-outline': IconTrash,
  'mdi-view-grid-outline': IconGridFilled,
  'mdi-buildings': IconBuildings,
  'mdi-horizontal-menu': IconMoreHorizontal,
  // 'mdi-plus-circle': IconPlusCircle
};

export type AeslIconModule = keyof typeof iconsMap;

export function useIcons() {
  function getIcon(name: AeslIconModule) {
    return iconsMap[name] || IconSettings;
  }

  return { getIcon };
}
