import { initFourDownloadDirectLinks } from './4download-direct-links';
import { initXdmoviesLandingPageMed, initXdmoviesMediatorPage } from '../sites/xdmovies';
import {
  initCoomeetIframeBootstrap,
  isOnCoomeetIframeHost,
  runCoomeetMainWorldAccelerator,
} from './coomeet-iframe';
import { init1shortlinkRedirect } from '../sites/1shortlink';
import { initAdfocusRedirect } from '../sites/adfocus';
import {
  initAdlinkClickVerifyPoll,
  initAdlinkflyLinksGo,
  initAdlinkflyTokenPayload,
} from '../sites/adlinkfly';
import { initArolinksUnlock, initArolinksMediator } from '../sites/arolinks';
import { initGplinksGate, initGplinksLinksGo, initGplinksMediator } from '../sites/gplinks';
import { initNitrolinkMediator, initNitrolinkUnlock } from '../sites/nitrolink';
import { initCut4moneyMediator, initCut4moneyUnlock } from '../sites/cut4money';
import { initTflyGate } from '../sites/tfly';
import { initMitlyGate } from '../sites/mitly';
import { initLinclikGate } from '../sites/linclik';
import { initCpmlinkHop, initCpmlinkUnlock } from '../sites/cpmlink';
import { initGenlinkEntry, initGenlinkMediator, initGenlinkUnlock } from '../sites/genlink';
import { initSflGate } from '../sites/sfl';
import { initBitcotasksReadArticle } from './bitcotasks-read-article';
import { initClipiRedirect } from '../sites/clipi';
import { initCookiesceoCopy } from './cookiesceo-copy';
import { initFastdlZipRedirect } from './fastdl-zip-redirect';
import { initFclcMediatorPage, initFclcShortlinkPage } from '../sites/fclc';
import { initIcutlinkLinksGo, initIcutlinkMediatorPage } from '../sites/icutlink';
import { initAnygameProductPage } from '../sites/anygame';
import { initApktealProductPage } from '../sites/apkteal';
import { initFilecrFileDownload, initFilecrProductPage } from '../sites/filecr';
import { initFilecryptGate } from '../sites/filecrypt';
import { initFilehippoBypass } from '../sites/filehippo';
import { initFilePressDirectDownload } from '../sites/filepress';
import { initSoftpediaBypass } from '../sites/softpedia';
import {
  initHdhub4uLandingPageMed,
  initHdhub4uMediatorPage,
  initHubcdnDl,
  initHubcloudDrive,
} from '../sites/hdhub4u';
import { initHaxpcGoPage, initHaxpcListing } from '../sites/haxpc';
import { initKitokolaDlGetBypass } from './kitokola-dl-get-bypass';
import { initKotakanimeidOutPage } from '../sites/kotakanimeid';
import { initLinkjust } from '../sites/linkjust';
import { initLinknextGate } from '../sites/linknext';
import { initLinksterrGateway } from '../sites/linksterr';
import { initLinkvertiseAccessPage } from '../sites/linkvertise';
import { initLlSafelinkHqChain, initLlacDdx } from '../sites/ll-safelink';
import { initLootlabsUnlock } from '../sites/lootlabs';
import { initMoviesModContentScript } from '../sites/movies-mod';
import { initOnhaxpkCopy } from '../sites/onhaxpk';
import { initOnlinetoolsDirectDownload } from '../sites/onlinetools';
import { initOuoBypass } from '../sites/ouo';
import { initPrmoviesRedirect } from '../sites/prmovies';
import { initSidMediatorBypass } from '../sites/sid-mediator';
import { initRomsfunDownloadInstant } from '../sites/romsfun';
import { initShortxlinksSafelinkChain } from '../sites/shortxlinks';
import { initShrinkmeEntry, initShrinkmeMediator, initShrinkmeUnlock } from '../sites/shrinkme';
import { initShrtslugRedirect } from '../sites/shrtslug';
import { initStbemuiptvcodesWpsafelink, initWpSafelinkRedirect } from '../sites/wp-safelink';
import { initSub2getRedirect } from '../sites/sub2get';
import { initSub2unlockUnlock } from '../sites/sub2unlock';
import {
  initSub4unlockComUnlock,
  initSub4unlockIoUnlock,
  initSub4unlockMeUnlock,
} from '../sites/sub4unlock';
import { initDroplinkUnlock } from '../sites/droplink';
import { initTech8sGate, initTech8sRedirect } from '../sites/tech8s';
import { initTinurlzSoftinfoFragment } from './tinurlz-softinfo-fragment';
import { initShycloudMediatorPage } from '../sites/shycloud';
import { initUsersdriveAutomation } from '../sites/usersdrive';
import { initMega4uploadBypass } from '../sites/mega4upload';
import { initMirroredFilesPage } from '../sites/mirrored';
import { initMove2linkGate } from '../sites/move2link';
import { initMp4uploadCountdownBypass } from '../sites/mp4upload';
import { initPlingDirectDownload } from '../sites/pling';
import { initMuhammadniazCountdownBypass } from '../sites/muhammadniaz';
import { initTipsguruRedirect } from '../sites/tipsguru';
import { initWahmiCountdownBypass } from '../sites/wahmi';
import { initCutyGate } from '../sites/cuty';
import { initCutwinGate } from '../sites/cutwin';
import { initExeioGate } from '../sites/exeio';
import { initLksfyGate, initLksfyMediator } from '../sites/lksfy';
import { initRinkuGate } from '../sites/rinku';
import { initBstshrtGate } from '../sites/bstshrt';
import { initLinkunlockerGate } from '../sites/linkunlocker';
import { initGaeaOperationsLockrGate } from '../sites/gaea-operations-lockr';

import { initStorylineCoursePlayBrand } from '../sites/storyline-scorm';
import { initSwiftuploadsDirectDownload } from '../sites/swiftuploads';
import { initUploadrarBypass } from '../sites/uploadrar';
import { initFilespayoutsBypass } from '../sites/filespayouts';
import { initTheuserCloudBypass } from '../sites/theuser-cloud';
import { initOceanofdmgBypass } from '../sites/oceanofdmg';
import { initPesktopBypass } from '../sites/pesktop';
import { initGoostEntry, initGoostMediator } from '../sites/goost';
import { initAnkergamesDirectDownload } from '../sites/ankergames';
import { initApunkagamesVlink, initApunkagamesDownloadProcess } from '../sites/apunkagames';
import { initGamesnostalgiaDirectDownload } from '../sites/gamesnostalgia';
import { initOceanofgamesDirectDownload } from '../sites/oceanofgames';
import { initYasir252DirectLinks, initYasir252MediatorPage } from '../sites/yasir252';
import { initVegamoviesLandingRedirect } from '../sites/vegamovies';

const INITS = [
  initStorylineCoursePlayBrand,
  initLinknextGate,
  initLinkvertiseAccessPage,
  initCutyGate,
  initCutwinGate,
  initExeioGate,
  initLksfyMediator,
  initLksfyGate,
  initRinkuGate,
  initBstshrtGate,
  initLinkunlockerGate,
  initGaeaOperationsLockrGate,
  initLootlabsUnlock,
  initLlSafelinkHqChain,
  initLlacDdx,
  initLinkjust,
  initLinksterrGateway,
  initShortxlinksSafelinkChain,
  init1shortlinkRedirect,
  initAdfocusRedirect,
  initGplinksGate,
  initGplinksMediator,
  initGplinksLinksGo,
  initArolinksMediator,
  initArolinksUnlock,
  initNitrolinkMediator,
  initNitrolinkUnlock,
  initCut4moneyMediator,
  initCut4moneyUnlock,
  initTflyGate,
  initMitlyGate,
  initLinclikGate,
  initCpmlinkUnlock,
  initCpmlinkHop,
  initGenlinkEntry,
  initGenlinkMediator,
  initGenlinkUnlock,
  initGoostEntry,
  initGoostMediator,
  initSflGate,
  initAdlinkClickVerifyPoll,
  initAdlinkflyLinksGo,
  initFourDownloadDirectLinks,
  initAnkergamesDirectDownload,
  initApunkagamesVlink,
  initApunkagamesDownloadProcess,
  initGamesnostalgiaDirectDownload,
  initOceanofgamesDirectDownload,
  initYasir252DirectLinks,
  initYasir252MediatorPage,
  initXdmoviesLandingPageMed,
  initXdmoviesMediatorPage,
  initMoviesModContentScript,
  initSidMediatorBypass,
  initAdlinkflyTokenPayload,
  initBitcotasksReadArticle,
  initClipiRedirect,
  initCookiesceoCopy,
  initFastdlZipRedirect,
  initAnygameProductPage,
  initApktealProductPage,
  initFilecrProductPage,
  initFilecrFileDownload,
  initFilecryptGate,
  initFilehippoBypass,
  initFilePressDirectDownload,
  initSoftpediaBypass,
  initFclcShortlinkPage,
  initFclcMediatorPage,
  initIcutlinkMediatorPage,
  initIcutlinkLinksGo,
  initHdhub4uLandingPageMed,
  initHdhub4uMediatorPage,
  initHubcdnDl,
  initHubcloudDrive,
  initHaxpcListing,
  initHaxpcGoPage,
  initKitokolaDlGetBypass,
  initKotakanimeidOutPage,
  initOnhaxpkCopy,
  initOnlinetoolsDirectDownload,
  initOuoBypass,
  initPrmoviesRedirect,
  initVegamoviesLandingRedirect,
  initRomsfunDownloadInstant,
  initShrinkmeEntry,
  initShrinkmeMediator,
  initShrinkmeUnlock,
  initShrtslugRedirect,
  initStbemuiptvcodesWpsafelink,
  initSub2getRedirect,
  initSub2unlockUnlock,
  initSub4unlockComUnlock,
  initSub4unlockIoUnlock,
  initSub4unlockMeUnlock,
  initDroplinkUnlock,
  initTech8sRedirect,
  initTech8sGate,
  initTinurlzSoftinfoFragment,
  initShycloudMediatorPage,
  initUsersdriveAutomation,
  initMega4uploadBypass,
  initMirroredFilesPage,
  initMove2linkGate,
  initMp4uploadCountdownBypass,
  initMuhammadniazCountdownBypass,
  initTipsguruRedirect,
  initPlingDirectDownload,
  initWahmiCountdownBypass,
  initWpSafelinkRedirect,
  initSwiftuploadsDirectDownload,
  initUploadrarBypass,
  initFilespayoutsBypass,
  initTheuserCloudBypass,
  initOceanofdmgBypass,
  initPesktopBypass,
];

const isExtensionContext = typeof chrome !== 'undefined' && !!chrome.runtime?.id;

function boot(): void {
  if (!isExtensionContext) {
    runCoomeetMainWorldAccelerator();
    return;
  }
  if (isOnCoomeetIframeHost()) {
    initCoomeetIframeBootstrap();
    return;
  }
  if (window !== window.top) return;
  for (const init of INITS) {
    try {
      init();
    } catch {}
  }
}

boot();
