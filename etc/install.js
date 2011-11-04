importPackage( Packages.com.openedit.util );
importPackage( Packages.java.util );
importPackage( Packages.java.lang );
importPackage( Packages.com.openedit.modules.update );

var war = "http://dev.entermediasoftware.com/jenkins/job/extension-openedit/lastSuccessfulBuild/artifact/deploy/extension-openedit.zip";

var root = moduleManager.getBean("root").getAbsolutePath();
var web = root + "/WEB-INF";
var tmp = web + "/tmp";

log.add("1. GET THE LATEST WAR FILE");
var downloader = new Downloader();
downloader.download( war, tmp + "/openedit.zip");

log.add("2. UNZIP WAR FILE");
var unziper = new ZipUtil();
unziper.unzip(  tmp + "/openedit.zip",  tmp );

log.add("3. REPLACE LIBS");
var files = new FileUtils();
files.deleteMatch( web + "/lib/openedit*.jar");

files.copyFileByMatch( tmp + "/lib/openedit*.jar", web + "/lib/");

files.deleteMatch( web + "/system/components/openedit/")
files.copyFileByMatch( tmp + "/base/system/components/openedit/", web + "/base/system/components/openedit/");



files.deleteMatch( web + "/openedit/")
files.copyFileByMatch( tmp + "/openedit/", "/openedit/");




log.add("5. CLEAN UP");
files.deleteAll(tmp);

log.add("6. UPGRADE COMPLETED");