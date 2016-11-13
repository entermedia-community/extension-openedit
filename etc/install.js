importPackage( Packages.org.openedit.util );
importPackage( Packages.java.util );
importPackage( Packages.java.lang );
importPackage( Packages.java.io );
importPackage( Packages.org.entermediadb.modules.update );



var war = "http://dev.entermediasoftware.com/jenkins/job/@BRANCH@extension-openedit/lastSuccessfulBuild/artifact/deploy/extension-openedit.zip";

var root = moduleManager.getBean("root").getAbsolutePath();
var web = root + "/WEB-INF";
var tmp = web + "/tmp";

log.info("1. GET THE LATEST WAR FILE");
var downloader = new Downloader();
downloader.download( war, tmp + "/extension-openedit.zip");

log.info("2. UNZIP WAR FILE");
var unziper = new ZipUtil();
unziper.unzip(  tmp + "/extension-openedit.zip",  tmp );

log.info("3. REPLACE LIBS");
var files = new FileUtils();
files.deleteMatch( web + "/lib/dev_extension-openedit*.jar");
files.deleteMatch( web + "/lib/extension-openedit*.jar");
files.deleteMatch( web + "/lib/openedit-8*.jar");
files.deleteMatch( web + "/lib/em9_extension-openedit*.jar");
files.deleteMatch( web + "/lib/em9dev_extension-openedit*.jar");




files.copyFileByMatch( tmp + "/lib/@BRANCH@extension-openedit*.jar", web + "/lib/");

files.deleteMatch( web + "/system/components/openedit/")


files.deleteMatch( web + "/WEB-INF/base/openedit/")
files.copyFileByMatch( tmp + "/base/openedit/", root + "/WEB-INF/base/openedit/");


log.info("5. CLEAN UP");
files.deleteAll(tmp);

log.add("6. UPGRADE COMPLETED");